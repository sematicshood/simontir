<template>
    <div>
        <div class="card col-md-6">
            <div class="card-header">
                Kontak
            </div>
            <div class="card-body">
                <input type="date" v-model="tanggal">

                <a href='#' @click='downloadCSV({ filename: "stock-data.csv" });'>Download CSV</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    
    @Component({})

    export default class File extends Vue {
        public tanggal: any = "";
        public json_data: any = [
            {
                "Name": "YourCompany 1-ACK-205",
                "Given Name": "YourCompany",
                "Additional Name": "1-ACK-205",
                "Family Name": "",
                "Yomi Name": "",
                "Given Name Yomi": "",
                "Additional Name Yomi": "",
                "Family Name Yomi": "",
                "Name Prefix": "",
                "Name Suffix": "",
                "Initials": "",
                "Nickname": "",
                "Short Name": "",
                "Maiden Name": "",
                "Birthday": "",
                "Gender": "",
                "Location": "",
                "Billing Information": "",
                "Directory Server": "",
                "Mileage": "",
                "Occupation": "",
                "Hobby": "",
                "Sensitivity": "",
                "Priority": "",
                "Subject": "",
                "Notes": "",
                "Group Membership": "* My Contacts",
                "Phone 1 - Type": "Mobile",
                "Phone 1 - Value": ""
            }
        ]

        public created() {
            
        }

        public convertArrayOfObjectsToCSV(args: any): any {
            var result: any, ctr: any, keys: any, columnDelimiter: any, lineDelimiter: any, data: any;

            data = args.data || null;
            if (data == null || !data.length) {
                return null;
            }

            columnDelimiter = args.columnDelimiter || ',';
            lineDelimiter = args.lineDelimiter || '\n';

            keys = Object.keys(data[0]);

            result = '';
            result += keys.join(columnDelimiter);
            result += lineDelimiter;

            data.forEach(function(item: any) {
                ctr = 0;
                keys.forEach(function(key: any) {
                    if (ctr > 0) result += columnDelimiter;

                    result += item[key];
                    ctr++;
                });
                result += lineDelimiter;
            });

            return result;
        }

        public downloadCSV(args: any): any {
            var data, filename, link;

            var csv = this.convertArrayOfObjectsToCSV({
                data: this.json_data
            });
            if (csv == null) return;

            filename = args.filename || 'export.csv';

            if (!csv.match(/^data:text\/csv/i)) {
                csv = 'data:text/csv;charset=utf-8,' + csv;
            }
            data = encodeURI(csv);

            link = document.createElement('a');
            link.setAttribute('href', data);
            link.setAttribute('download', filename);
            link.click();
        }
    }
</script>
