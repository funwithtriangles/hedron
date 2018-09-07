# Hedron User Guide

Here is a quick overview of how to use Hedron.

## Sketches
Sketches are created with [three.js](https://github.com/mrdoob/three.js/). They are a Javascript module that exports a single [THREE.Group](https://threejs.org/docs/#api/objects/Group), to be placed in the main scene. The different aspects of a sketch can be controlled using "params" and "shots".

### Adding and removing sketches
Many sketches can be added to the same Hedron scene. These can be multiple instances of the same sketch, or different types of sketches.

In order to add sketches, click on the "+" in the right sidebar. If you're starting from scratch, you'll need to tell Hedron where your sketch folder is.

To remove a sketch, click the delete button at the bottom of the view for that sketch.

### Switching between sketches
You can switch between different sketches that are already added to Hedron using the right sidebar.

## Params
Params are the variables of a sketch. They are always a value between 0 and 1 (although more types of param are [planned](https://github.com/nudibranchrecords/hedron/issues/13)). The simplest way to control a param is to click and drag the value bar.

### Adding an input to a param
The real power of Hedron is the ability to link different inputs to a param. This can be audio, LFO or MIDI.

To add an input to a param:

 1. Open the param by clicking on the area below the value bar
 2. Choose an input using the "add new input" dropdown
 3. Click the "activate" button to enable.

You can add more inputs and choose between them using the tabs inside that param. You'll note that each type of input has its own extra controls. Each of these can also be assigned to a MIDI control by clicking on the icon next to the value bar.

The activate/disable button can also be assigned a MIDI control by clicking on the icon next to the button (must send a "note on" midi message).

Some things to note:

 - Adding a MIDI input will involve a "MIDI learn" step
 - MIDI inputs are always active, they do not have an active/disabled state

## Shots
Shots are functions that the sketch has exposed for the user to have fun with. These could be things such as explosions, pre scripted animations, etc. The simplest way to control a shot is to click on the hit area for that shot.

### Adding an input to a shot
Shots have a very similar system to adding inputs as params, so please refer to the section above. However, there are a few things to note:

 - When a shot has an audio input, the shot will display a value bar and a red "target line". If the value passes the target, the shot fires. It then needs to drop below this target to rearm. Adjusting the gain can give control over how often this fires
 - MIDI should be a "note on" type control
 - Instead of LFO, shots have a "sequencer". The rows of the sequencer are **one beat** (quarter note) split into 8. Click on each step for when you want the shot to fire.

## Reimporting shots and params
If you've already got a project going with some sketches and then make edits to a sketch, Hedron automatically loads in the new content. However, if you've made changes to config.js, you'll need to "reimport" to see the new params and shots. Do this by clicking the button at the bottom of the view for that sketch.

## Macros
Macros make it possible to control many params at once. To start using macros, click on "Macros" on the right sidebar.

### Adding a macro

 1. Click "add macro" and give it a name
 2. Click "start learning". Any changes to params you make will now be added to this macro.
 3. Change some param values in a sketch
 4. Click "stop learning"

### Macro gotchas

Currently, after creating a macro, it wont do much until you change the values of its target values. This is because when you are teaching the macro, you are moving the params to their target. You'll need to move these param values away from their target for the macro to work.

Improvements to macros are [planned](https://github.com/nudibranchrecords/hedron/issues/10).

## MIDI Devices
Midi devices display on the left hand side, underneath the preview.

### MIDI Banks
You can change the current bank you are using for each device using the list of numbers next to that device. When assigning MIDI anywhere, it will default to the current bank you are on for that device.

## MIDI Clock
By default, MIDI clock is generated by Hedron.

- Use the "Tap Tempo" button to match the tempo of the song you are performing to.
- Use the "reset" button at the beginning of the beat/bar/phrase to keep things in sync.
- You can manually edit the generated clock BPM, or disable it completely in the settings. (Project > Settings)
- If you have an external MIDI clock connected, Hedron will detect it automatically. You should disable the generated clock if you are using an external one.

## Other features

* Save or load using "Project > Save/Load/Save As..."
* Send to a connected display using "Displays > "Send to XXX"