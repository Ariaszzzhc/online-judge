package com.hiczp.onlinejudge.web.controller

import com.hiczp.onlinejudge.shared.dao.JudgeResult
import com.hiczp.onlinejudge.shared.dao.ProblemRepository
import com.hiczp.onlinejudge.shared.dao.SubmitHistoryRepository
import com.hiczp.onlinejudge.web.model.ProblemViewModel
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/problems")
class ProblemController(private val problemRepository: ProblemRepository,
                        private val submitHistoryRepository: SubmitHistoryRepository) {
    @GetMapping("/{id}")
    fun getProblem(@PathVariable id: Long) =
            problemRepository.findById(id).orElseThrow { ProblemNotFoundException() }.run {
                ProblemViewModel(
                        id = id,
                        problemSet = problemSet,
                        indexInProblemSet = indexInProblemSet,
                        title = title,
                        difficulty = difficulty,
                        submitCount = submitHistoryRepository.countByProblem_Id(id),
                        acceptCount = submitHistoryRepository.countByProblem_IdAndJudgeResult(id, JudgeResult.ACCEPT),
                        description = description,
                        sampleInput = sampleInput,
                        sampleOutput = sampleOutput
                )
            }
}

@ResponseStatus(HttpStatus.NOT_FOUND, reason = "Request Problem Not Found")
class ProblemNotFoundException : RuntimeException()
