class Util {
    getRandomPhone() {
        return Math.floor(Math.random() * 99999999999 + 1)
    }

    getRandonPassword() {
        return Math.random().toString(36).slice(-7)
    }

    getRandonCode(){
        this.textoAleatorio(6)
    }

    getRandonCode(tamanho) {
        const letras = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        let aleatorio = '';
        for (let i = 0; i < tamanho; i++) {
            const rnum = Math.floor(Math.random() * letras.length);
            aleatorio += letras.substring(rnum, rnum + 1);
        }
        return aleatorio;
    }

    screenshot() {
        const dateFull = new Date();

        var d = dateFull.getDate()
        var m = dateFull.getMonth() + 1
        var y = dateFull.getFullYear()
        var h = dateFull.getHours()
        var m = dateFull.getMinutes()
        var s = dateFull.getSeconds()

        var dateTimeCurrent = '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + ' ' + h + ':' + m + s;

        cy.screenshot(dateTimeCurrent)
    }
}

export default new Util()