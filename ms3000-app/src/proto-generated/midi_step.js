/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

goog.provide('proto.MIDI_STEP');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.MIDI_OCTAVE');


/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.MIDI_STEP = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.MIDI_STEP, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.MIDI_STEP.displayName = 'proto.MIDI_STEP';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.MIDI_STEP.prototype.toObject = function(opt_includeInstance) {
  return proto.MIDI_STEP.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.MIDI_STEP} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.MIDI_STEP.toObject = function(includeInstance, msg) {
  var f, obj = {
    step: jspb.Message.getFieldWithDefault(msg, 1, 0),
    octave: (f = msg.getOctave()) && proto.MIDI_OCTAVE.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.MIDI_STEP}
 */
proto.MIDI_STEP.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.MIDI_STEP;
  return proto.MIDI_STEP.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.MIDI_STEP} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.MIDI_STEP}
 */
proto.MIDI_STEP.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setStep(value);
      break;
    case 2:
      var value = new proto.MIDI_OCTAVE;
      reader.readMessage(value,proto.MIDI_OCTAVE.deserializeBinaryFromReader);
      msg.setOctave(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.MIDI_STEP.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.MIDI_STEP.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.MIDI_STEP} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.MIDI_STEP.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getOctave();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.MIDI_OCTAVE.serializeBinaryToWriter
    );
  }
};


/**
 * required int32 step = 1;
 * @return {number}
 */
proto.MIDI_STEP.prototype.getStep = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.MIDI_STEP.prototype.setStep = function(value) {
  jspb.Message.setField(this, 1, value);
};


proto.MIDI_STEP.prototype.clearStep = function() {
  jspb.Message.setField(this, 1, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.MIDI_STEP.prototype.hasStep = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * required MIDI_OCTAVE octave = 2;
 * @return {!proto.MIDI_OCTAVE}
 */
proto.MIDI_STEP.prototype.getOctave = function() {
  return /** @type{!proto.MIDI_OCTAVE} */ (
    jspb.Message.getWrapperField(this, proto.MIDI_OCTAVE, 2, 1));
};


/** @param {!proto.MIDI_OCTAVE} value */
proto.MIDI_STEP.prototype.setOctave = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.MIDI_STEP.prototype.clearOctave = function() {
  jspb.Message.setField(this, 2, undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.MIDI_STEP.prototype.hasOctave = function() {
  return jspb.Message.getField(this, 2) != null;
};


