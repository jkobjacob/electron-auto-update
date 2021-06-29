const builder = require('electron-builder');

builder.build({
  targets: builder.Platform.MAC.createTarget(),
});
