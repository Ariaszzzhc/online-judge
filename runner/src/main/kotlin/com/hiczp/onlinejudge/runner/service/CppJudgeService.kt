package com.hiczp.onlinejudge.runner.service

import com.hiczp.onlinejudge.runner.configuration.RunnerConfigurationProperties
import com.hiczp.onlinejudge.shared.dao.SubmitHistoryRepository
import com.hiczp.onlinejudge.shared.message.PendingSubmission
import org.springframework.stereotype.Service

@Service
class CppJudgeService(runnerConfigurationProperties: RunnerConfigurationProperties,
                      submitHistoryRepository: SubmitHistoryRepository)
    : JudgeService(runnerConfigurationProperties, submitHistoryRepository) {
    override fun judgeAndSaveResult(pendingSubmission: PendingSubmission) {
        super.judgeAndSaveResult(pendingSubmission, sourceCodeFileName, compileCommand, runningCommand)
    }

    companion object {
        private const val sourceCodeFileName = "code.cpp"
        private val compileCommand = arrayOf("g++", sourceCodeFileName)
        private const val elfFileName = "a.out"
        private val runningCommand = arrayOf("./$elfFileName")
    }
}
