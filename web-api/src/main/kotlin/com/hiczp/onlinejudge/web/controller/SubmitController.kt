package com.hiczp.onlinejudge.web.controller

import com.hiczp.onlinejudge.shared.autoConfigure.RabbitMQConfiguration
import com.hiczp.onlinejudge.shared.dao.ProblemRepository
import com.hiczp.onlinejudge.shared.dao.SubmitHistory
import com.hiczp.onlinejudge.shared.dao.SubmitHistoryRepository
import com.hiczp.onlinejudge.shared.dao.UserRepository
import com.hiczp.onlinejudge.shared.message.PendingSubmission
import com.hiczp.onlinejudge.web.model.SubmitFormModel
import org.springframework.amqp.rabbit.core.RabbitTemplate
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@RestController
@RequestMapping("/submit")
class SubmitController(private val rabbitTemplate: RabbitTemplate,
                       private val problemRepository: ProblemRepository,
                       private val userRepository: UserRepository,
                       private val submitHistoryRepository: SubmitHistoryRepository) {
    @PostMapping("/{id}")
    fun submitProblem(@PathVariable id: Long, @Valid @RequestBody submitFormModel: SubmitFormModel): Any {
        val problem = problemRepository.findById(id).orElseThrow { ProblemNotFoundException() }
        val submitHistory = SubmitHistory(
                problem = problem,
                user = userRepository.findById(1).get(),
                language = submitFormModel.language,
                sourceCode = submitFormModel.sourceCode
        )
        return submitHistoryRepository.save(submitHistory).let {
            rabbitTemplate.convertAndSend(
                    RabbitMQConfiguration.EXCHANGE_NAME,
                    RabbitMQConfiguration.ROUTING_KEY,
                    PendingSubmission(it)
            )
            object {
                val id = problem.problemSet.id
            }
        }
    }
}
