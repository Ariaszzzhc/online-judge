package com.hiczp.onlinejudge.runner.service

import com.hiczp.onlinejudge.runner.configuration.RunnerConfigurationProperties
import com.hiczp.onlinejudge.shared.dao.JudgeResult
import com.hiczp.onlinejudge.shared.dao.SubmitHistoryRepository
import com.hiczp.onlinejudge.shared.message.PendingSubmission
import org.springframework.stereotype.Service
import java.nio.charset.StandardCharsets
import java.nio.file.Files
import java.nio.file.Paths

@Service
class CJudgeService(private val runnerConfigurationProperties: RunnerConfigurationProperties,
                    private val submitHistoryRepository: SubmitHistoryRepository) : JudgeService {
    override fun judgeAndSaveResult(pendingSubmission: PendingSubmission) {
        //计算工作目录绝对路径
        val workDirectory = Paths.get("")
                .toAbsolutePath()
                .resolve(runnerConfigurationProperties.workDirectory)
                .also {
                    it.toFile().apply {
                        if (!exists()) mkdirs()
                    }
                }

        //保存源码到文件
        Files.write(
                workDirectory.resolve(sourceCodeFileName),
                pendingSubmission.sourceCode.toByteArray(StandardCharsets.UTF_8)
        )

        //compile
        ProcessBuilder("gcc", sourceCodeFileName)
                .directory(workDirectory.toFile())
                .start()
                .waitFor()
                .run {
                    if (this != 0) {
                        submitHistoryRepository.findById(pendingSubmission.submitHistoryId).get().also {
                            submitHistoryRepository.save(
                                    it.apply {
                                        judgeResult = JudgeResult.COMPILE_ERROR
                                    }
                            )
                        }
                        return
                    }
                }

        //创建输入输出文件
        val inputFile = Files.write(
                workDirectory.resolve(inputFileName),
                pendingSubmission.problem.input?.toByteArray(StandardCharsets.UTF_8) ?: emptyByteArray
        )
        val outputFile = Files.write(
                workDirectory.resolve(outputFileName),
                emptyByteArray
        )

        //run elf
        val startTime = System.currentTimeMillis()
        ProcessBuilder("./$elfFileName")
                .directory(workDirectory.toFile())
                .redirectInput(inputFile.toFile())
                .redirectOutput(outputFile.toFile())
                .start()
                .waitFor()
                .run {
                    val runningTime = System.currentTimeMillis() - startTime
                    val judgeResult = if (this != 0) {
                        JudgeResult.RUNTIME_ERROR
                    } else {
                        //判断输出是否正确
                        if (Files.readAllBytes(outputFile)!!
                                        .contentEquals(pendingSubmission.problem.output.toByteArray(StandardCharsets.UTF_8))) {
                            JudgeResult.ACCEPT
                        } else {
                            JudgeResult.WRONG_ANSWER
                        }
                    }
                    submitHistoryRepository.findById(pendingSubmission.submitHistoryId).get().also {
                        submitHistoryRepository.save(
                                it.apply {
                                    this.judgeResult = judgeResult
                                    this.runningTime = runningTime
                                }
                        )
                    }
                }
    }

    companion object {
        private const val sourceCodeFileName = "code.c"
        private const val elfFileName = "a.out"
        private const val inputFileName = "input"
        private const val outputFileName = "output"
        private val emptyByteArray = ByteArray(0)
    }
}
