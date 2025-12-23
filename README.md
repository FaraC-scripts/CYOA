These scripts implement a Choose Your Own Adventure Mode for AI Dungeon scenarios. They should work for most adventures.

To CYOA them to a scenario you are creating, while editing the scenario go to Details -> Edit Scripts, then paste each above file in its entirety into the apropriate section, overwriting the default code.

To use CYOA in an adventure, type "/cyoa" in Do or Say to be presented with four options (a, b, c, and d) about the next event in the adventure. Then type "/a", "/b", "/c", or "/d" to select one.

An additional command, "/cyoa mode" currently switches between shorter and longer option descriptions. Because of limitations in AI Dungeon's current scripting API, this mode switch will also have the AI present you with four choices (in the mode you switched to).
