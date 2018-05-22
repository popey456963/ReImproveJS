import {Academy} from "../academy";



export class LearningDataLogger {
    private parent: HTMLElement;
    private tables: {teacherName: string, table: HTMLTableElement}[];

    constructor(element: string | HTMLElement, private academy: Academy) {
        if(typeof element == "string") {
            this.parent = document.getElementById(element);
        } else {
            this.parent = element;
        }

        this.tables = [];
        this.academy.Teachers.forEach(name => this.createTeacherTable(name));
        this.tables.forEach(val => this.parent.appendChild(val.table));
    }

    createTeacherTable(teacherName: string): void {
        const table = document.createElement('table');
        const thead = <HTMLTableSectionElement> table.createTHead();
        const tbody = <HTMLTableSectionElement> table.createTBody();

        const hrow = thead.insertRow(0);
        hrow.insertCell(0).innerHTML = "Name";
        hrow.insertCell(1).innerHTML = "Q loss average";
        hrow.insertCell(2).innerHTML = "Average reward";
        hrow.insertCell(3).innerHTML = "Epsilon";


        this.academy.getTeacherData(teacherName).forEach(data => {
            const brow = tbody.insertRow(0);
            brow.insertCell(0).innerHTML = data.name;
            brow.insertCell(1).innerHTML = "";
            brow.insertCell(2).innerHTML = "";
            brow.insertCell(3).innerHTML = "";
        });


        LearningDataLogger.tableStyle(table);
        this.tables.push({teacherName: teacherName, table: table});
    }

    updateTables(): void {
        this.tables.forEach(table => {
            this.academy.getTeacherData(table.teacherName).forEach(data => {
                table.table.tBodies.item(0).rows.item(0).cells.item(1).innerHTML = data.averageLoss.toString().substr(0, 5);
                table.table.tBodies.item(0).rows.item(0).cells.item(2).innerHTML = data.averageReward.toString().substr(0, 5);
                table.table.tBodies.item(0).rows.item(0).cells.item(3).innerHTML = data.epsilon.toString().substr(0, 5);
            });
        });
    }

    dispose(): void {
        this.tables.forEach(table => {
            this.parent.removeChild(table.table);
        })
    }

    static tableStyle(table: HTMLTableElement) {
        table.style.border = "medium solid #6495ed";
        table.style.borderCollapse = "collapse";

        table.tHead.style.fontFamily = "monospace";
        table.tHead.style.border = "thin solid #6495ed";
        table.tHead.style.padding = "5px";
        table.tHead.style.backgroundColor = "#d0e3fa";
        table.tHead.style.textAlign = "center";
        table.tHead.style.margin = "3px";

        for(let i = 0;i < table.tBodies.length; ++i) {
            const item = table.tBodies.item(i);
            item.style.fontFamily = "sans-serif";
            item.style.border = "thin solid #6495ed";
            item.style.padding = "5px";
            item.style.textAlign = "center";
            item.style.backgroundColor = "#ffffff";
            item.style.margin = "3px";
        }
    }
}