'use strict';

/* Magic Mirror
 * Module: MMM-MQTT-Service
 *
 */

const NodeHelper = require('node_helper');
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost')

module.exports = NodeHelper.create({
  start: function () {
    client.on('connect', () => {
      client.subscribe('MagicMirror');
      console.log("subscribed");
    });

client.on('message', (topic, message) => {
      console.log(message);
      console.log(topic);
    });
    this.started = false;
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
  }

});
