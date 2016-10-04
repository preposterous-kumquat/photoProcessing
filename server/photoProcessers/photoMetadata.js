var ExifImage = require('exif').ExifImage;
const Promise = require('bluebird');

module.exports = (filepath) => {
  return new Promise(function(resolve, reject) {
    new ExifImage({ image: filepath }, function (error, exifData) {
      resolve(extractLatLongData(exifData));
      reject(error);
    });
  });
};

const extractLatLongData = (exif) => {
  if (exif && exif.gps && exif.gps.GPSLatitude) {
    const lat = exif.gps.GPSLatitude;
    lat.push(exif.gps.GPSLatitudeRef);
    const long = exif.gps.GPSLongitude;
    long.push(exif.gps.GPSLongitudeRef);
    return {
      lat: convertDMSToDD(lat[0], lat[1], lat[2], lat[3]),
      long: convertDMSToDD(long[0], long[1], long[2], long[3])
    };
  } else {
    return null;
  }
};

const convertDMSToDD = (degrees, minutes, seconds, direction) => {
  var dd = degrees + minutes / 60 + seconds / (60 * 60);
  if (direction === 'S' || direction === 'W') {
    dd = dd * -1;
  } // Don't do anything for N or E
  return dd;
};




// var testResult = { image:
//    { Make: 'Apple',
//      Model: 'iPhone 6s Plus',
//      Orientation: 1,
//      XResolution: 72,
//      YResolution: 72,
//      ResolutionUnit: 2,
//      Software: '9.3.5',
//      ModifyDate: '2016:09:03 11:15:48',
//      ExifOffset: 198,
//      GPSInfo: 1672 },
//   thumbnail: {},
//   exif:
//    { ExposureTime: 0.06666666666666667,
//      FNumber: 2.2,
//      ExposureProgram: 2,
//      ISO: 100,
//      ExifVersion: <Buffer 30 32 32 31>,
//      DateTimeOriginal: '2016:09:03 11:15:48',
//      CreateDate: '2016:09:03 11:15:48',
//      ComponentsConfiguration: <Buffer 01 02 03 00>,
//      ShutterSpeedValue: 3.906969787615914,
//      ApertureValue: 2.2750072066878064,
//      BrightnessValue: 1.2958846500450585,
//      ExposureCompensation: 0,
//      MeteringMode: 5,
//      Flash: 24,
//      FocalLength: 4.15,
//      SubjectArea: [ 2015, 1511, 2217, 1330 ],
//      MakerNote: <Buffer 41 70 70 6c 65 20 69 4f 53 00 00 01 4d 4d 00 0f 00 01 00 09 00 00 00 01 00 00 00 04 00 02 00 07 00 00 02 2e 00 00 00 c8 00 03 00 07 00 00 00 68 00 00 ... >,
//      SubSecTimeOriginal: '998',
//      SubSecTimeDigitized: '998',
//      FlashpixVersion: <Buffer 30 31 30 30>,
//      ColorSpace: 1,
//      ExifImageWidth: 4032,
//      ExifImageHeight: 3024,
//      SensingMethod: 2,
//      SceneType: <Buffer 01>,
//      ExposureMode: 0,
//      WhiteBalance: 0,
//      FocalLengthIn35mmFormat: 29,
//      SceneCaptureType: 0,
//      LensInfo: [ 4.15, 4.15, 2.2, 2.2 ],
//      LensMake: 'Apple',
//      LensModel: 'iPhone 6s Plus back camera 4.15mm f/2.2' },
//   gps:
//    { GPSLatitudeRef: 'N',
//      GPSLatitude: [ 37, 49, 13.19 ],
//      GPSLongitudeRef: 'W',
//      GPSLongitude: [ 122, 17, 19.75 ],
//      GPSAltitudeRef: 1,
//      GPSAltitude: 13.264290517821117,
//      GPSTimeStamp: [ 18, 15, 48 ],
//      GPSSpeedRef: 'K',
//      GPSSpeed: 0,
//      GPSImgDirectionRef: 'T',
//      GPSImgDirection: 159.47457627118644,
//      GPSDestBearingRef: 'T',
//      GPSDestBearing: 159.47457627118644,
//      GPSDateStamp: '2016:09:03',
//      GPSHPositioningError: 5 },
//   interoperability: {},
//   makernote: { error: 'Unable to extract Makernote information as it is in an unsupported or unrecognized format.' } }

// /*
// IDEAL TEST IMG DATA
// { image:
//    { Make: 'Apple',
//      Model: 'iPhone 6s Plus',
//      Orientation: 1,
//      XResolution: 72,
//      YResolution: 72,
//      ResolutionUnit: 2,
//      Software: '9.3.5',
//      ModifyDate: '2016:09:03 11:15:48',
//      ExifOffset: 198,
//      GPSInfo: 1672 },
//   thumbnail: {},
//   exif:
//    { ExposureTime: 0.06666666666666667,
//      FNumber: 2.2,
//      ExposureProgram: 2,
//      ISO: 100,
//      ExifVersion: <Buffer 30 32 32 31>,
//      DateTimeOriginal: '2016:09:03 11:15:48',
//      CreateDate: '2016:09:03 11:15:48',
//      ComponentsConfiguration: <Buffer 01 02 03 00>,
//      ShutterSpeedValue: 3.906969787615914,
//      ApertureValue: 2.2750072066878064,
//      BrightnessValue: 1.2958846500450585,
//      ExposureCompensation: 0,
//      MeteringMode: 5,
//      Flash: 24,
//      FocalLength: 4.15,
//      SubjectArea: [ 2015, 1511, 2217, 1330 ],
//      MakerNote: <Buffer 41 70 70 6c 65 20 69 4f 53 00 00 01 4d 4d 00 0f 00 01 00 09 00 00 00 01 00 00 00 04 00 02 00 07 00 00 02 2e 00 00 00 c8 00 03 00 07 00 00 00 68 00 00 ... >,
//      SubSecTimeOriginal: '998',
//      SubSecTimeDigitized: '998',
//      FlashpixVersion: <Buffer 30 31 30 30>,
//      ColorSpace: 1,
//      ExifImageWidth: 4032,
//      ExifImageHeight: 3024,
//      SensingMethod: 2,
//      SceneType: <Buffer 01>,
//      ExposureMode: 0,
//      WhiteBalance: 0,
//      FocalLengthIn35mmFormat: 29,
//      SceneCaptureType: 0,
//      LensInfo: [ 4.15, 4.15, 2.2, 2.2 ],
//      LensMake: 'Apple',
//      LensModel: 'iPhone 6s Plus back camera 4.15mm f/2.2' },
//   gps:
//    { GPSLatitudeRef: 'N',
//      GPSLatitude: [ 37, 49, 13.19 ],
//      GPSLongitudeRef: 'W',
//      GPSLongitude: [ 122, 17, 19.75 ],
//      GPSAltitudeRef: 1,
//      GPSAltitude: 13.264290517821117,
//      GPSTimeStamp: [ 18, 15, 48 ],
//      GPSSpeedRef: 'K',
//      GPSSpeed: 0,
//      GPSImgDirectionRef: 'T',
//      GPSImgDirection: 159.47457627118644,
//      GPSDestBearingRef: 'T',
//      GPSDestBearing: 159.47457627118644,
//      GPSDateStamp: '2016:09:03',
//      GPSHPositioningError: 5 },
//   interoperability: {},
//   makernote: { error: 'Unable to extract Makernote information as it is in an unsupported or unrecognized format.' } }

// */