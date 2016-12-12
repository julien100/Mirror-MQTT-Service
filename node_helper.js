'use strict';

/* Magic Mirror
 * Module: MMM-MQTT-Service
 *
 */

const NodeHelper = require('node_helper');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost');
const exec = require("child_process").exec;


module.exports = NodeHelper.create({
  start: function () {
    client.on('connect', () => {
      client.subscribe('MagicMirror');
      console.log("Subscribed to Magic Mirror!");
    });

client.on('message', (topic, message) => {
      var data = JSON.parse(message.toString('utf8'));

      if(data.command === "GO_TO_SLEEP"){
        exec("/opt/vc/bin/tvservice -o", null);
      } else if (data.command === "WAKE_UP") {
        exec("/opt/vc/bin/tvservice -p && sudo chvt 6 && sudo chvt 7", null);
      } else {
        this.sendSocketNotification("MQTT_COMMAND", data);
      }
    });



    this.started = false;
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
  }

});
