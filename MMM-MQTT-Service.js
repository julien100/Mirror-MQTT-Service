/* global Module */

/* Magic Mirror
 * Module: MMM-MQTT-Service
 *
 * MIT Licensed.
 */

Module.register('MMM-MQTT-Service',{
	defaults: {

	},
	// Override socket notification handler.
	socketNotificationReceived: function(notification, payload) {
		console.log("MMM-MQTT-Service notification received!");
		console.log(notification);
		console.log(payload);

		if (notification === "MQTT_COMMAND") {
			if (payload.receiver === "VOICE_FOOTBALL") {
				this.sendNotification("VOICE_FOOTBALL" , payload.command);
			}
		}
	},
	start: function() {
		Log.info('Starting module: ' + this.name);
	}
});
