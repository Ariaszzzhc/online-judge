package com.hiczp.onlinejudge.runner.listener

import com.hiczp.onlinejudge.runner.service.CJudgeService
import com.hiczp.onlinejudge.runner.service.CppJudgeService
import com.hiczp.onlinejudge.runner.service.JavaJudgeService
import com.hiczp.onlinejudge.shared.autoConfigure.RabbitMQConfiguration
import com.hiczp.onlinejudge.shared.dao.Language
import com.hiczp.onlinejudge.shared.message.PendingSubmission
import org.slf4j.LoggerFactory
import org.springframework.amqp.rabbit.annotation.RabbitHandler
import org.springframework.amqp.rabbit.annotation.RabbitListener
import org.springframework.stereotype.Component

@Component
@RabbitListener(queues = [RabbitMQConfiguration.QUEUE_NAME])
class PendingSubmissionListener(private val cJudgeService: CJudgeService,
                                private val cppJudgeService: CppJudgeService,
                                private val javaJudgeService: JavaJudgeService) {
    @RabbitHandler
    fun receiveMessage(pendingSubmission: PendingSubmission) {
        logger.debug("Starting new task, " +
                "user: ${pendingSubmission.user.nick}, " +
                "problemSet: ${pendingSubmission.problem.problemSet.title}, " +
                "problem: ${pendingSubmission.problem.title}"
        )
        when (pendingSubmission.language) {
            Language.C -> cJudgeService
            Language.CPP -> cppJudgeService
            Language.JAVA -> javaJudgeService
        }.judgeAndSaveResult(pendingSubmission)
    }

    companion object {
        private val logger = LoggerFactory.getLogger(PendingSubmissionListener::class.java)
    }
}
