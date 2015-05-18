// Local (client-only) collection
Alerts = new Mongo.Collection(null);

alert = function(title, message, type) {
	Alerts.insert({
		title:title,
		message: message,
		type:type
	})
	$('.alert').addClass('show');
	Meteor.setTimeout( function () {
		$('.alert').removeClass('show');
		$('.alert').addClass('hide');
	}, 4500);
};

Template.alerts.helpers({
	alerts: function() {
		return Alerts.find();
	}
});

Template.alert.onRendered( function() {
	var alert = this.data;
	console.log(this.data);
	console.log('im rendered! error template');
	Meteor.setTimeout(function () {
		Alerts.remove(alert._id);
	}, 5000);
});