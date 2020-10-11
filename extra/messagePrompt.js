module.exports = async (channel, author, time) => {
    time *= 1000;
    const filter = message => message.author.id === author.id;
  
    return channel
      .awaitMessages(filter, { max: 1, time: time })
      .then(collected => collected.first());
  };
  