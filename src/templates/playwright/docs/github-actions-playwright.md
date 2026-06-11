# GitHub Actions para Playwright

Este documento descreve o workflow de referência em `.github/workflows/ci.yml` para execução de testes E2E com Playwright, geração de relatório Allure, publicação no GitHub Pages e suporte a múltiplos ambientes.

## Objetivo

- Executar testes E2E com Playwright em GitHub Actions.
- Manter `qa` como ambiente padrão para execuções automáticas.
- Permitir execução manual em outros ambientes sem alterar o YAML.
- Gerar relatório Allure mesmo quando os testes falham.
- Publicar o relatório Allure no GitHub Pages.
- Preservar o histórico do Allure para habilitar gráficos de trend.

## Gatilhos

| Gatilho | Comportamento |
|---|---|
| `push` em `main`/`master` | Executa testes em `qa`, gera Allure e publica no GitHub Pages quando a branch for a branch padrão do repositório |
| `pull_request` para `main`/`master` | Executa testes em `qa` e publica artifacts, sem deploy no GitHub Pages |
| `workflow_dispatch` | Permite executar manualmente informando `target_environment` e, opcionalmente, `test_tag`; publica no GitHub Pages quando rodar na branch padrão |

## Multiambiente

O workflow define `TEST_ENV` a partir do input manual `target_environment`. Quando o input não existe, como em `push` e `pull_request`, o valor padrão é `qa`:

```yaml
env:
  TEST_ENV: ${{ github.event.inputs.target_environment || 'qa' }}
```

A execução dos testes injeta esse valor em `NODE_ENV`:

```yaml
- name: Run Playwright tests
  run: npm test
  env:
    NODE_ENV: ${{ env.TEST_ENV }}
```

Antes de executar os testes, a pipeline valida se existe um arquivo de configuração para o ambiente solicitado:

```text
config/<ambiente>.config.ts
```

Exemplos:

```text
config/qa.config.ts
config/dev.config.ts
```

Para adicionar um novo ambiente em outro projeto:

1. Criar `config/staging.config.ts`, `config/hml.config.ts` ou equivalente.
2. Registrar o ambiente em `config/index.ts`.
3. Executar manualmente o workflow usando esse nome em `target_environment`.

Essa validação evita que um ambiente escrito errado rode acidentalmente contra `qa`.

## Execução Por Tag

Em execução manual, o input opcional `test_tag` permite filtrar os testes executados pelo `--grep` do Playwright.

Exemplos de valores:

```text
@smoke
@regression
```

Quando `test_tag` é informado, o workflow executa:

```bash
npm test -- --grep "<tag>"
```

Quando `test_tag` fica vazio, o workflow executa a suíte completa:

```bash
npm test
```

Esse filtro é aplicado apenas quando necessário. Execuções automáticas por `push` e `pull_request` continuam rodando a suíte completa em `qa`.

## Jobs

O workflow tem dois jobs para manter responsabilidades separadas:

| Job | Responsabilidade |
|---|---|
| `test` | Instala dependências, instala browsers, valida ambiente, executa Playwright, gera Allure e publica artifacts |
| `deploy-pages` | Publica o relatório Allure gerado pelo job `test` no GitHub Pages |

Essa separação permite aplicar permissões mínimas:

- `test`: `contents: read`
- `deploy-pages`: `pages: write` e `id-token: write`

## Etapas Principais

1. Faz checkout do repositório.
2. Configura Node.js 24 com cache de npm.
3. Instala dependências com `npm ci`.
4. Valida se o ambiente informado existe em `config/`.
5. Restaura o histórico anterior do Allure por ambiente.
6. Instala browsers e dependências do Playwright com `npx playwright install --with-deps`.
7. Executa a suíte com `npm test` ou com `npm test -- --grep "<tag>"` quando `test_tag` for informado.
8. Copia o histórico restaurado para `allure-results/history`.
9. Gera o relatório Allure com `npm run allure:generate`.
10. Preserva o novo `allure-report/history` em cache.
11. Publica artifacts do relatório e dos resultados brutos.
12. Prepara o artifact usado pelo GitHub Pages.

## Allure e GitHub Pages

O workflow publica dois tipos de artifact:

| Artifact | Conteúdo | Uso |
|---|---|---|
| `allure-report-<ambiente>` | HTML final do Allure | Download direto pela execução do workflow |
| `allure-results-<ambiente>` | Resultados brutos do Allure | Debug, auditoria e regeneração futura |

Quando a execução acontece na branch padrão, o diretório `allure-report` também é enviado para o GitHub Pages via `actions/upload-pages-artifact` e publicado pelo job `deploy-pages`.

Para habilitar a publicação, configure o repositório em:

```text
Settings > Pages > Source > GitHub Actions
```

## Trend do Allure

O Allure só exibe gráficos de tendência quando recebe histórico de execuções anteriores. Como runners do GitHub Actions são descartáveis, o workflow preserva apenas a pasta de histórico:

```text
allure-report/history
```

Na execução seguinte, esse histórico é restaurado e copiado para:

```text
allure-results/history
```

O cache é separado por ambiente:

```text
allure-history-qa-*
allure-history-dev-*
```

Com isso, a trend de `qa` não se mistura com a trend de `dev`. A primeira execução cria o histórico inicial; os gráficos de trend passam a aparecer a partir das execuções seguintes do mesmo ambiente.

> Nota: cada execução salva o histórico sob uma chave de cache única (`allure-history-<ambiente>-<run_id>-<run_attempt>`), pois caches do GitHub Actions são imutáveis. A restauração sempre usa o cache mais recente do mesmo ambiente via `restore-keys`. Caches antigos não são removidos manualmente — o GitHub aplica eviction automática por LRU ao atingir o limite de 10GB por repositório, o que é suficiente para a maioria dos projetos. Se o volume de execuções for muito alto, considere um workflow agendado de limpeza com `gh cache delete`.

## Boas Práticas Aplicadas

- `npm ci` para instalação determinística.
- `actions/setup-node` com cache de npm.
- Node.js 24 e actions atualizadas para o runtime mais recente.
- `npx playwright install --with-deps` para runners Linux.
- `timeout-minutes` para evitar jobs presos indefinidamente.
- `if: always()` nas etapas de relatório para preservar evidências em falhas.
- Deploy bloqueado para `push` ou execução manual na branch padrão.
- Artifacts nomeados por ambiente.
- Histórico do Allure separado por ambiente.
- Permissões mínimas por job.
- Sem matriz de Node quando há apenas uma versão suportada, reduzindo complexidade desnecessária.
- `retention-days: 7` nos artifacts do Allure, evitando consumo desnecessário de armazenamento em projetos com execuções frequentes.
- `cancel-in-progress` habilitado apenas para `pull_request`, cancelando execuções obsoletas em pushes sucessivos sem arriscar interromper um deploy do GitHub Pages.
- `.github/dependabot.yml` mantém as actions (`checkout`, `setup-node`, `cache`, `upload-artifact`, etc.) atualizadas automaticamente via PRs semanais.

## Pontos Para Adaptar

- Branches monitoradas em `push` e `pull_request`.
- Versão do Node.js, caso o projeto exija outra versão LTS.
- Ambientes disponíveis em `config/`.
- Nome e política do ambiente `github-pages`, caso a organização use proteção ou aprovação manual.
- Estratégia de publicação do relatório, caso o projeto não utilize GitHub Pages.
- `retention-days` dos artifacts do Allure, caso a organização exija um período diferente de retenção.
