Template.postItem.helpers({
  negativeVote: function () {
    return this.votes < 0;
  },
  zeroVote: function () {
    return this.votes === 0;
  },
  positiveVote: function () {
    return this.votes > 0;
  },
  answered: function () {
    return this.answered === true;
  }
});