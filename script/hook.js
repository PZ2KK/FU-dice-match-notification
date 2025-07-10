Hooks.on("diceSoNiceRollComplete", async (chatMessageId) => {
  const chatMessage = game.messages.get(chatMessageId);
  if (!chatMessage || !chatMessage.isRoll) return;

  const roll = chatMessage.rolls?.[0];
  if (!roll || roll.dice.length === 0) return;

  for (const term of roll.dice) {
    if (term.results.length > 1) {
      const results = term.results.map(r => r.result);
      const allSame = results.every(r => r === results[0]);

      if (allSame) {
        const value = results[0];
        const numDice = results.length;
        const dieType = term.faces;

        let message = "";
        let soundSrc = "";
        let color = "";

        if (value === 1) {
          message = `FUMBLE ROLL!!`;
          soundSrc = "modules/FU-dice-match-notification/sounds/fumble.wav";
          color = "crimson";
        } else {
          message = `CRITICAL SUCCESS!!`;
          soundSrc = "modules/FU-dice-match-notification/sounds/critical.wav";
          color = "limegreen";
        }

        ChatMessage.create({
          speaker: ChatMessage.getSpeaker(),
          content: `<p style="font-size: 1.2em; color: ${color}; font-weight: bold;">${message}</p>`
        });

        AudioHelper.play({
          src: soundSrc,
          volume: 0.4,
          autoplay: true,
          loop: false
        }, true);
      }
    }
  }
});
