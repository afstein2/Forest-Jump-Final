class StateMachine {
    constructor(states) {
        this.states = {}
        this.current = null

        for (const s of states) {
            this.states[s.name] = s
            if (s.initial) this.current = s.name
        }
    }

    getState() {
        return this.states[this.current]
    }

    consumeEvent(event) {
        const state = this.getState()
        const nextName = state.events[event]
        if (nextName && this.states[nextName]) {
            this.current = nextName
        }
    }

    reset() {
        for (const name in this.states) {
            if (this.states[name].initial) {
                this.current = name
                return
            }
        }
    }
}