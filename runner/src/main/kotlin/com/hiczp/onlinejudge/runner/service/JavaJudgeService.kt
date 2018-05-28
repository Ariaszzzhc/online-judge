package com.hiczp.onlinejudge.runner.service

import com.hiczp.onlinejudge.runner.configuration.RunnerConfigurationProperties
import com.hiczp.onlinejudge.shared.dao.SubmitHistoryRepository
import com.hiczp.onlinejudge.shared.message.PendingSubmission
import org.springframework.stereotype.Service

@Service
class JavaJudgeService(runnerConfigurationProperties: RunnerConfigurationProperties,
                       submitHistoryRepository: SubmitHistoryRepository)
    : JudgeService(runnerConfigurationProperties, submitHistoryRepository) {
    override fun judgeAndSaveResult(pendingSubmission: PendingSubmission) {
        super.judgeAndSaveResult(pendingSubmission, sourceCodeFileName, compileCommand, runningCommand)
    }

    companion object {
        private const val sourceCodeFileName = "Main.java"
        private val compileCommand = arrayOf("javac", sourceCodeFileName)
        private val runningCommand = arrayOf("java", "Main")
    }
}
