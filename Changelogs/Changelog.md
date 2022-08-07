# Changelog

## [0.17.10] - 07-08-2022 17:51:25

### Fixes

- Fixed an issue causing victory screen to be shown prematurely at higher pings
- Fixed a stream of damage labels emitting from remote players on higher pings
- Fixed hurt animation playing twice per hit for a remote players on client due to network rollback

### Links

- [Android](0.17.10)
- [iOS](0.17.10)
- [Windows64](0.17.10)
- [Linux64](0.17.10)
- [WindowsServer64](0.17.10)
- [LinuxServer64](0.17.10)

## [0.17.9]

### What's New

- Added new weapon icon

### Fixes

- Fixed animation playback exception causing server freeze
- Fixed missing death loot box presentation
- Patch for missing Sniper Special Attachment when picked with Sniper
- Fixed Loot Location for a single loot point near charging station

### Changes

- Updated lighting for A11
- Disabled receive shadows on characters
- Disabled loot point shortage debug log on develop
- Replaced high poly loot assets with optimized low poly assets
- Modified minimap UI canvas sort order as it was being placed on top of BR HUD Screen

## [0.17.8]

### Fixes

- Fixed touch based drag and drop action not working for inventory items
- Fixed out of map bugs, Made new colliders for interior walls to make sure players are not able to pass through walls, fixed gaps and clippings, fixed sinking issues.
- Fix for animancer weights going above 1 due to accurate network animation state syncing forcibly setting the state weights. Precise network animation reconciliation is now optional, and does not apply to local player.
- Sprint Turn now works properly on the remote players when a player sprints diagonally.
- Fixed inconsistency between Sniper & Sniper Ammo Pickup Color
- Fixed loot streak color inconsistencies
- Fixed loot streak blurriness

### Changes

- Disabled shadows for both Gun and FP arms when in FP mode.
- Touch controls : Button knob shine effect update for look and move. Updated button placement for eject.
- Replaced Open Loot with primitive shapes

## [0.17.7]

### What's New

- Added animated tutorial for drop touch controls
- Enabled dropping loot items under single loot point.
- Added HitSurface Script to loot point colliders ; Enabled bullet impacts
- Added persistent state toggle for loot pickup UI

### Fixes

- Fixed storm color issue causing entire map to go black and white
- Dive animation continues playing on the lower body when impact state is skipped by colliding against a vertical wall. This has now been fixed.
- Fixed wrong damage direction calculation on the network, fixed hurt animation not playing on local player. Accuracy of damage direction increased from 2 degrees to 1.5 degrees.

### Changes

- Increased player fall speed and decreased fall control
- Changed in air control
- Disabled Death Box disabling after finishing all item pickup

## [0.17.6] - 01-08-2022 14:31:50

### What's New

- Added simple matchmaking; Allows clients to start finding a room automatically without entering a room name ; Clients will try to find and Room name input field is hidden but active. All special codes for different modes are allowed. Click on the middle of room name prompt to interact.  to connect to any active server for up to 5 times with a delay of 3 seconds each ;
- Added input enable delay before being able to eject from the drop formation
- Added new SFX for player hits for guns
- Added proper support for shooting feedback for network loop; Partially Fixes : https://app.clickup.com/t/7243652/IN-4527 ; Remote vs Remote Kills can still get lost over network sometimes ( TODO ) ; Fixes : https://app.clickup.com/t/7243652/IN-5053

### Fixes

- Fixed player taking damage at the start of waiting phased of each storm round

### Changes

- Updated visuals for all the reticles of all the scopes & sights
- Enable Shooting inputs while interacting with Loot
- Disabled FP Gun Sway for ADS ; Fixes : https://app.clickup.com/t/7243652/IN-2196
- Will require one extra swipe gesture to trigger iOS system actions like notification or backgrounding
- Replaced player death loot box to a cleaner asset
- Removed build number from changelog
- Decreased rendering scale to 55% of native display resolution to prevent excessive device overheating
- Disabled storm b/w effect; Was causing two time rendering overhead
- Remove cage collider in A11 added to prevent stray falls

### Known Issues

- On headshot kills , a stream of damage labels is emitted at higher pings

### Remarks

- When no custom room name is provided and match is attempted , game will try to find a random open game room and attempt to connect to it. Special codes can be used with no room names to start a matchmade room session which other clients can connect to via matchmaking

### Links

- [Windows64](https://indus-builds.s3.ap-south-1.amazonaws.com/Windows64/Windows64_Ver(0.17.6_2)___Date(01-08-2022_13-07-26)/Indus_V0.17.6_2.zip)

## [0.17.5] - 01-08-2022 08:26:01

### What's New

- Added sub asset manager
- Added self hosted build runner support
- Added server build support
- Added step to discard changes made by the build
- Added version and build number panel

### Changes

- Updated build bystem
- Updated changelog system

### Links

- [Android](https://indus-builds.s3.ap-south-1.amazonaws.com/Android/Android_Ver(0.17.3_1)___Date(29-07-2022_14-36-24)/Indus_V0.17.3_1.apk)
- [Windows64](https://indus-builds.s3.ap-south-1.amazonaws.com/Windows64/Windows64_Ver(0.17.5_1)___Date(29-07-2022_16-21-25)/Indus_V0.17.5_1.zip)
- [iOS](https://indus-builds.s3.ap-south-1.amazonaws.com/iOS/iOS_Ver(0.17.5_1)___Date(29-07-2022_16-39-56)/Indus_V0.17.5_1.zip)
- [WindowsServer64](https://indus-builds.s3.ap-south-1.amazonaws.com/WindowsServer64/WindowsServer64_Ver(0.17.5_1)___Date(31-07-2022_09-41-07)/Indus_V0.17.5_1.zip)
