import { Component } from "@angular/core";

const SENSOR_NAMES = ["Мальчик", "Хочет", "В", "Тамбов", "Ты", "знаешь", "чики", "чики", "чики", "чикита"];

const generateSensors = () => {
  let sensors = [];
  for (let i = 0; i < 10; i++) {
    sensors.push({
      id: i,
      name: SENSOR_NAMES[i],
      status: Math.random() > 0.5 ? "online" : "offline"
    });
  }
  return sensors;
};

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.sass"]
})
export class AppComponent {
  sensors = generateSensors();
  inputVal = "";
  onChange(event) {
    this.inputVal = event.target.value;
  }
  deleteSensor(id) {
    let foundIdx = this.sensors.findIndex(el => el.id === id);
    if (foundIdx !== undefined) this.sensors.splice(foundIdx, 1);
  }
  addSensor() {
    if (this.inputVal.length > 0) {
      this.sensors.push({
        id: this.sensors[this.sensors.length - 1].id + 1,
        name: this.inputVal,
        status: Math.floor((Math.random() * 1) + 1) ? "online" : "offline"
      });
      this.inputVal = "";
    }
  }
}
