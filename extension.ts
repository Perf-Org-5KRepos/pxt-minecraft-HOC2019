/**
 * Writing data for hacking stem experiments
 */
//% weight=94 color=#EC7505 icon="\uf1b3"
namespace hourOfCode {
    // the agentDestroy and hazardsRemain functions are supposed to
    // look indistinguishable from lesson to lesson, since only one
    // set will ever appear at a time. their display names should
    // not specifically include which lesson they are a part of
    let targetsL4 = 5
    let targetsL5 = 10
    let targetsL6 = 49
    let counterL4 = 9
    let counterL5 = 24
    let counterL6 = 60
    let shortHazard = 31   // fern and tallgrass
    let tallHazard = 175   // double plant (variants: peony, rose bush, double tallgrass, large fern, lilac, sunflower)
    let airBlock = Block.Air
    let brokeNonHazard = false
    let taskIsComplete = false

    // hidden from user, used by other functions
    //% block
    function completeTask() {
        if (!taskIsComplete) {
            mobs.execute(
                mobs.target(TargetSelectorKind.NearestPlayer),
                positions.create(0, 0, 0),
                "scoreboard players set @s success 1"
            )
            taskIsComplete = true
        }
    }

    /**
     * Opens a gate
     */
    //% block="open gate"
    //% weight=90
    export function openDoor() {
        completeTask()
    }

    /**
     * Detects if there is a dry fern next to the agent in the specified direction
     * @param dir the direction to detect the dry fern
     */
    //% block="agent detect dry fern %dir"
    //% weight=80
    export function agentDetectDryFern(dir: SixDirection) {
        return agent.inspect(AgentInspection.Block, dir) == shortHazard
    }

    /**
     * Detects if there is dry grass next to the agent in the specified direction
     * @param dir the direction to detect the dry grass
     */
    //% block="agent detect dry grass %dir"
    //% weight=80
    export function agentDetectDryGrass(dir: SixDirection) {
        return agent.inspect(AgentInspection.Block, dir) == tallHazard
    }

    /**
     * Check for any hazards in a direction
     * @param dir the direction to check for hazards
     */
    //% block="agent analyze %dir"
    //% weight=70
    export function agentAnalyze(dir: SixDirection) {
        let targetBlock = agent.inspect(AgentInspection.Block, dir)
        if (targetBlock == shortHazard || targetBlock == tallHazard) {
            mobs.execute(
                mobs.target(TargetSelectorKind.NearestPlayer),
                positions.create(0, 0, 0),
                "playsound random.levelup @p"
            )
            completeTask()
        }
    }

    /**
     * Checks that there are fire hazards
     */
    //% block="hazards remain"
    //% weight=45
    export function hazardsRemainL4() {
        let timeout = 20
        if (agent.inspect(AgentInspection.Block, SixDirection.Forward) == airBlock) {
            counterL4--
            if (targetsL4 <= 0) {
                completeTask()
                return false
            } else if (counterL4 < 0) {
                return false
            } else if (brokeNonHazard) {
                return false
            }
            while (agent.inspect(AgentInspection.Block, SixDirection.Forward) == airBlock) {
                loops.pause(100)
                if (timeout-- <= 0) {
                    return false
                }
            }
        }
        return true
    }

    /**
     * Commands the agent to destroy a block in the given direction
     * @param dir the direction to destroy a block at
     */
    //% block="agent destroy %dir"
    //% weight=40
    export function agentDestroyL4(dir: SixDirection) {
        let targetBlock4 = agent.inspect(AgentInspection.Block, dir)
        if (targetBlock4 == shortHazard || targetBlock4 == tallHazard) {
            targetsL4--
        } else if (targetBlock4 != airBlock) {
            brokeNonHazard = true
        }
        agent.destroy(dir)
    }

    /**
     * Checks that there are fire hazards
     */
    //% block="hazards remain"
    //% weight=55
    export function hazardsRemainL5() {
        counterL5--
        if (brokeNonHazard) {
            return false
        } else if (counterL5 < 0) {
            return false
        } else if (targetsL5 <= 0) {
            completeTask()
            return false
        } else {
            return true
        }
    }

    /**
     * Commands the agent to destroy a block in the given direction
     * @param dir the direction to destroy a block at
     */
    //% block="agent destroy %dir"
    //% weight=50
    export function agentDestroyL5(dir: SixDirection) {
        let targetZ5 = 70
        let agentZ5 = agent.getPosition().getValue(Axis.Z)
        let targetBlock5 = agent.inspect(AgentInspection.Block, dir)
        if (targetBlock5 == shortHazard || targetBlock5 == tallHazard) {
            if (Math.abs(agentZ5 - targetZ5) <= 1) {
                targetsL5--
            } else {
                brokeNonHazard = true
            }
        } else if (targetBlock5 != airBlock) {
            brokeNonHazard = true
        }
        agent.destroy(dir)
    }

    /**
     * Checks that there are fire hazards
     */
    //% block="hazards remain"
    //% weight=65
    export function hazardsRemainL6() {
        counterL6--
        if (brokeNonHazard) {
            return false
        } else if (counterL6 < 0) {
            return false
        } else if (targetsL6 <= 0) {
            completeTask()
            return false
        } else {
            return true
        }
    }

    /**
     * Commands the agent to destroy a block in the given direction
     * @param dir the direction to destroy a block at
     */
    //% block="agent destroy %dir"
    //% weight=60
    export function agentDestroyL6(dir: SixDirection) {
        let targetX6 = -8
        let targetZ6 = 77
        let radius = 5
        let agentX6 = agent.getPosition().getValue(Axis.X)
        let agentZ6 = agent.getPosition().getValue(Axis.Z)
        let targetBlock6 = agent.inspect(AgentInspection.Block, dir)
        if (targetBlock6 == shortHazard || targetBlock6 == tallHazard) {
            if (Math.abs(agentX6 - targetX6) <= radius && Math.abs(agentZ6 - targetZ6) <= radius) {
                targetsL6--
            } else {
                brokeNonHazard = true
            }
        } else if (targetBlock6 != airBlock) {
            brokeNonHazard = true
        }
        agent.destroy(dir)
    }
}
