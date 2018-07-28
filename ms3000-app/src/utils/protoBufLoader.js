import protobuf from 'protobufjs'


var xxx = {};



//console.log("test hack", protobufs, protobufs.test)

export function getProtocolBuffersPromise() {
  var promise = new Promise(function(resolve, reject) {
    protobuf.load(process.env.PUBLIC_URL + "MS3000.proto", function (err, root) {
      if (err)
        reject(Error(err));

      // Obtain a message type
      xxx.MS3KG = root.lookupType("MS3KG");
      xxx.Light = root.lookupType("Light");
      xxx.root = root

      console.log("stage2", xxx)

      resolve();
    })
  });

  return promise
}




export default xxx;
