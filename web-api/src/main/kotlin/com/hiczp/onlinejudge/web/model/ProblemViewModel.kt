package com.hiczp.onlinejudge.web.model

import com.hiczp.onlinejudge.shared.dao.Problem
import com.hiczp.onlinejudge.shared.dao.ProblemSet

data class ProblemViewModel(
        val id: Long,
        val problemSet: ProblemSet? = null,
        val indexInProblemSet: Long,
        val title: String,
        val difficulty: Problem.Difficulty,
        val submitCount: Long,
        var acceptCount: Long,
        val description: String? = null,
        val sampleInput: String? = null,
        val sampleOutput: String? = null
)
