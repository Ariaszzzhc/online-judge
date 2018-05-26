package com.hiczp.onlinejudge.web.controller

import com.hiczp.onlinejudge.shared.dao.*
import com.hiczp.onlinejudge.web.model.ProblemViewModel
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/problemSets")
class ProblemSetController(private val problemSetRepository: ProblemSetRepository,
                           private val problemRepository: ProblemRepository,
                           private val submitHistoryRepository: SubmitHistoryRepository) {
    @GetMapping("/practice")
    fun getPracticeProblemSet() = problemSetRepository.findByType(ProblemSet.Type.PRACTICE)

    @GetMapping("/contest")
    fun getContestProblemSet() = problemSetRepository.findByType(ProblemSet.Type.CONTEST)

    @GetMapping("/{id}")
    fun getProblemSet(@PathVariable id: Long) = problemSetRepository.findById(id).orElseThrow { ProblemSetNotFoundException() }!!

    @GetMapping("/{id}/problems")
    fun getProblems(@PathVariable id: Long) =
            problemRepository.findByProblemSet_IdOrderByIndexInProblemSet(id).map {
                ProblemViewModel(
                        id = it.id!!,
                        indexInProblemSet = it.indexInProblemSet,
                        title = it.title,
                        difficulty = it.difficulty,
                        submitCount = submitHistoryRepository.countByProblem_Id(it.id!!),
                        acceptCount = submitHistoryRepository.countByProblem_IdAndJudgeResult(it.id!!, JudgeResult.ACCEPT)
                )
            }
}

@ResponseStatus(HttpStatus.NOT_FOUND, reason = "Request ProblemSet Not Found")
class ProblemSetNotFoundException : RuntimeException()
