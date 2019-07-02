<template>
    <div>
        <div class="card col-md-12">
            <div class="card-body">
                <div class="col-md-12">
                    <h4>Follow Up</h4>
                    <label class="switch">
                        <input :disabled="isDisabled('followUp')" v-model="followUp" type="checkbox">
                        <span class="slider round"></span>
                    </label>
                    <hr>
                </div>
                <div class="col-md-12">
                    <h4>Reminder</h4>
                    <label class="switch">
                        <input :disabled="isDisabled('reminder')" v-model="reminder" type="checkbox">
                        <span class="slider round"></span>
                    </label>
                    <hr>
                </div>
                <div class="col-md-12">
                    <h4>Tanggal</h4>
                    <input :disabled="isDisabled('date')" v-model="dateStart" type="date" name="" id="">
                    <input :disabled="isDisabled('date')" v-model="dateEnd" type="date" name="" id="">
                    <hr>
                </div>

                <div class="col-md-12">
                    <h4>KPB</h4>
                    <input v-model="kpb" type="radio" name="kpb" value="1"> 1 &nbsp;&nbsp;
                    <input v-model="kpb" type="radio" name="kpb" value="2"> 2 &nbsp;&nbsp;
                    <input v-model="kpb" type="radio" name="kpb" value="3"> 3 &nbsp;&nbsp;
                    <input v-model="kpb" type="radio" name="kpb" value=""> Tidak
                    <hr>
                </div>

                <div class="col-md-12">
                    <h4>Service</h4>
                    <input v-model="service" type="radio" name="service" value="Lengkap"> Lengkap &nbsp;&nbsp;
                    <input v-model="service" type="radio" name="service" value="Ringan"> Ringan &nbsp;&nbsp;
                    <input v-model="service" type="radio" name="service" value=""> Tidak
                    <hr>
                </div>

                <div class="col-md-12">
                    <h4>Ganti Oli</h4>
                    <input v-model="oli" type="radio" name="oli" value="true"> Ya &nbsp;&nbsp;
                    <input v-model="oli" type="radio" name="oli" value="false"> Tidak &nbsp;&nbsp;
                    <hr>
                </div>

                <div class="col-md-12">
                    <h4>Ganti Part</h4>
                    <input v-model="part" type="radio" name="part" value="true"> Ya &nbsp;&nbsp;
                    <input v-model="part" type="radio" name="part" value="false"> Tidak &nbsp;&nbsp;
                    <hr>
                </div>

                <div class="col-md-12">
                    <h4>Turun Mesin</h4>
                    <input v-model="mesin" type="radio" name="mesin" value="true"> Ya &nbsp;&nbsp;
                    <input v-model="mesin" type="radio" name="mesin" value="false"> Tidak &nbsp;&nbsp;
                    <hr>
                </div>

                <div class="col-md-12">
                    <h4>Type Motor</h4>
                    <Multiselect
                        v-model="typeMotor"
                        :multiple="true"
                        :options="options">
                    </Multiselect>
                    <hr>
                </div>

                <button :disabled="isDone()" class="btn form-control btn-primary" @click='exportTemplate()'>Export Template</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    const multi = require('vue-multiselect')
    const { Multiselect } = multi

    import file from '../api/file';

    import vehicle from '../api/vehicle';
    
    @Component({
        components: {
            Multiselect
        }
    })

    export default class File extends Vue {
        public json_data: any       = []
        public typeMotor: any       = null;
        public options: any         = [];
        public followUp: boolean    = false;
        public reminder: boolean    = false;
        public dateStart: string    = '';
        public dateEnd: string      = '';
        public date: string         = '';
        public kpb: string          = '';
        public service: string      = '';
        public oli: boolean         = false;
        public part: boolean        = false;
        public mesin: boolean       = false;

        public created() {
            vehicle.getTypeVehicle().then(res => {
                try {
                    this.options = res.data.results
                } catch (error) {
                    
                }
            })
        }

        public isDone(): boolean {
            if(this.followUp !== false || this.reminder !== false || this.dateStart !== '' || this.dateEnd !== '') {
                return false
            }

            return true
        }

        public exportTemplate(): void {
            let typeMotors: any = null;

            if (this.typeMotor) {
                typeMotors = '[';

                this.typeMotor.forEach((el: any) => {
                    let data = "'" + el + "'"
                    typeMotors += data += ',';
                })

                typeMotors += ']';
            }

            const params = {
                'followUp': this.followUp,
                'reminder': this.reminder,
                'date': this.date,
                'kpb': this.kpb,
                'service': this.service,
                'ganti_oli': this.oli,
                'ganti_part': this.part,
                'turun_mesin': this.mesin,
                'type_motor': typeMotors,
            }

            file.exportTemplateWABlaster(params).then(res => {
                try {
                    this.json_data = res.data.results

                    this.downloadCSV({ filename: "template-wablaster.csv" })
                } catch (error) {
                    
                }
            })
        }

        public isDisabled(data: any): boolean {
            if (data === 'followUp') {
                if (this.reminder === false && this.date === '') {
                    return false;
                }
            }

            if (data === 'reminder') {
                if (this.followUp === false && this.date === '') {
                    return false;
                }
            }

            if (data === 'date') {
                if (this.followUp === false && this.reminder === false) {
                    return false;
                }
            }

            return true
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

            if (csv == null) {
                alert('Data tidak ditemukan')

                return
            };

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

        public setDate() {
            this.date = this.dateStart + ' - ' + this.dateEnd
        }

        @Watch('dateStart')
        onDateStartChange() {
            this.setDate()
        }

        @Watch('dateEnd')
        onDateEndChange() {
            this.setDate()
        }
    }
</script>

<style>
/* .switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 14px;
}

.switch input v-model="" { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 10px;
  width: 10px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input v-model="":checked + .slider {
  background-color: #2196F3;
}

input v-model="":focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input v-model="":checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
/* .slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
} */
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>