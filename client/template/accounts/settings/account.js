
// check if browser supports file api and filereader features
if (File && FileReader && FileList && Blob) {

  var cropperDeps = new Tracker.Dependency;
  var drawCropper = function() {
    cropperDeps.depend();

    var avatarView = $('#previewImg');
    if (avatarView && avatarView[0]) {
      avatarView.cropper('destroy').cropper();
    }
    console.log('cropper depend call');
  };

  //this is not completely neccesary, just a nice function I found to make the file size format friendlier
  //http://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable
  var profile = {
    //this function is called when the input loads an image
    _renderImage: function(file) {
      var reader = new FileReader();
      reader.onload = function(event){
        $('#preview').html("<img id='previewImg' src='"+event.target.result+"' />");
        //$('#name').html(file.name);
        //$('#type').html(file.type);
        //$('#size').html(humanFileSize(file.size, "MB"));

        cropperDeps.changed();
      };
      //when the file is read it triggers the onload event above.
      reader.readAsDataURL(file);
    },

    _readableFileSize: function(bytes, si) {
      var thresh = si ? 1000 : 1024;
      if(bytes < thresh) return bytes + ' B';
      var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
      var u = -1;
      do {
        bytes /= thresh;
        ++u;
      } while(bytes >= thresh);
      return bytes.toFixed(1)+' '+units[u];
    }
  };
} else alert('The File APIs are not fully supported in this browser.');



Template.account.events({
  'click .profile-edit-username .btn-edit': function () {
    var usernameEdit = $('li.profile-edit-username');

    if (usernameEdit.hasClass('open')) {
      usernameEdit.removeClass('open');
    } else {
      usernameEdit.addClass('open');
    }

    $('li.profile-edit-username .inner').slideToggle(300);
  },

  'click .profile-edit-email .btn-edit': function () {
    var emailEdit = $('li.profile-edit-email');

    if (emailEdit.hasClass('open')) {
      emailEdit.removeClass('open');
    } else {
      emailEdit.addClass('open');
    }

    $('li.profile-edit-email .inner').slideToggle(300);
  },

  'click .profile-change-password .btn-edit': function () {
    var passwordChange = $('li.profile-change-password');

    if (passwordChange.hasClass('open')) {
      passwordChange.removeClass('open');
    } else {
      passwordChange.addClass('open');
    }

    $('li.profile-change-password .inner').slideToggle(300);
  },

  'click .profile-edit-item .btn-edit': function (event) {
    var item = $(event.target).closest('.profile-edit-item');
    if (item.hasClass('open')) {
      $(event.target).html('닫기');
    } else {
      $(event.target).html('수정');
    }
    $(event.target).blur();
  },

  'change #choose-avatar': function(event) {
    profile._renderImage(event.target.files[0]);
  }
});

Template.account.onRendered(function() {
  Tracker.autorun(function () {
    drawCropper();
  });
});
