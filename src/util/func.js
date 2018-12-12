export default {
  shortenNumber(num) {
    return num > 10000 ? `${Math.floor((num / 1000) * 10) / 10}k` : num
  }
}
