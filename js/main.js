var vm = new Vue({
    el: "#app",
    data: {
        blocks: [],
        turn: -1
    },
    mounted() {
        this.restart()
    },
    methods: {
        player_go(block) {
            // if (block.type==0){
            block.type = this.turn
            this.turn = -this.turn
            // }else{
            //   alert("Block has value!")
            // }
        },
        restart() {
            this.blocks = Array.from({
                length: 9
            }, () => ({
                type: 0
            }))
        }
    },
    computed: {
        pattern_data() {
            var verify_list = "123,456,789,147,258,369,159,357"
            var results =
                verify_list.split(",")
                .map((vtext) => {
                    var result = this.blocks
                        .filter((d, i) => vtext.indexOf(i + 1) != -1)
                        .map(o => o.type)
                        .reduce((a, b) => (a + b), 0)
                    return {
                        pattern: vtext,
                        value: result
                    }
                });
            return results
        },
        who_win() {
            var results = this.pattern_data.filter(o => Math.abs(o.value) == 3)
            if (results.length > 0) {
                return (results[0].value > 0 ? "O" : "X") + " Wins!"
            } else {
                return "Player:"
            }
            return results
        }
    }
})