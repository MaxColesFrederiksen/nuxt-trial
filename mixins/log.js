export const log = {
  methods: {
    log (log) {
      console.log(JSON.parse(JSON.stringify(log)));
    }
  }
}