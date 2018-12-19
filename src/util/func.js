export default {
  shortenNumber(num) {
    return num > 10000 ? `${Math.floor((num / 1000) * 10) / 10}k` : num
  },

  updateUserExp(score) {
    const EXP = Object.assign({}, M.user.exp)
    if (!score) {
      return
    }
    // level * (level + 10) 是经验计算公式
    if (score > 0) {
      if (EXP.have_exp + score >= EXP.next_level_exp) {
        const newLevel = EXP.level + 1
        EXP.level = newLevel
        EXP.have_exp = EXP.have_exp + score - EXP.next_level_exp
        EXP.next_level_exp = newLevel * newLevel + newLevel * 10
      } else {
        EXP.have_exp = EXP.have_exp + score
      }
    } else {
      if (EXP.have_exp + score < 0) {
        const newLevel = EXP.level - 1
        const lastTotalExp = newLevel * newLevel + newLevel * 10
        EXP.have_exp = lastTotalExp + EXP.have_exp + score
        EXP.next_level_exp = lastTotalExp
      } else {
        EXP.have_exp = EXP.have_exp + score
      }
    }
    M.user.exp = EXP
  }
}
