package com.hiczp.onlinejudge.web.controller

import com.hiczp.onlinejudge.shared.dao.SubmitHistoryRepository
import org.springframework.data.domain.Pageable
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/submitHistories")
class SubmitHistoryController(private val submitHistoryRepository: SubmitHistoryRepository) {
    @GetMapping("/{id}")
    fun getSubmitHistories(@PathVariable id: Long, pageable: Pageable) =
            submitHistoryRepository.findByProblem_ProblemSet_IdOrderBySubmitTimeDesc(id, pageable)
}
