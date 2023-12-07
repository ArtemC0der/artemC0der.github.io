var WPTB_TableDirectives = function (table) {
    this.table = table;
    const tableDirectivesDataKey = 'wptbTableDirectives';

    this.getDirectives = function () {
        const encodedTableDirectives = this.table.dataset[tableDirectivesDataKey];
        if (encodedTableDirectives === undefined) {
            return false;
        } else {
            return JSON.parse(atob(encodedTableDirectives));
        }
    }

    this.saveDirectives = function () {
        if(!this.tableDirectives) return;
        const encodedTableDirectives = btoa(JSON.stringify(this.tableDirectives));
        this.table.dataset[tableDirectivesDataKey] = encodedTableDirectives;
    }

    this.getDirective = function (way) {
        this.tableDirectives = this.getDirectives();
        if(!this.tableDirectives) this.tableDirectives = {};
        let field = this.tableDirectives;
        let value;
        for(let i = 0; i < way.length; i++) {
            if(!field.hasOwnProperty(way[i])) {
                value = false;
                break;
            } else {
                if(i === way.length - 1) {
                    value = field[way[i]];
                    break;
                }
                field = field[way[i]];
            }
        }

        return value;
    }

    this.setDirective = function (way, value) {
        this.tableDirectives = this.getDirectives();
        if(!this.tableDirectives) this.tableDirectives = {};
        let field = this.tableDirectives;
        for(let i = 0; i < way.length; i++) {

            if(i === way.length - 1) {
                field[way[i]] = value;
                this.saveDirectives();
                break;
            }
            if(!field.hasOwnProperty(way[i])) {
                field[way[i]] = {};
            }

            field = field[way[i]];
        }
    }

    this.tableDirectives = this.getDirectives();
}
