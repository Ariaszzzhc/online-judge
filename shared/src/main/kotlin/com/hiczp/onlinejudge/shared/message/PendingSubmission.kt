package com.hiczp.onlinejudge.shared.message

import com.hiczp.onlinejudge.shared.dao.Language
import com.hiczp.onlinejudge.shared.dao.Problem
import com.hiczp.onlinejudge.shared.dao.SubmitHistory
import com.hiczp.onlinejudge.shared.dao.User
import java.io.Serializable

data class PendingSubmission(
        val submitHistoryId: Long,
        val user: User,
        val problem: Problem,
        val language: Language,
        val sourceCode: String
) : Serializable {
    constructor(submitHistory: SubmitHistory) : this(
            submitHistory.id!!,
            submitHistory.user,
            submitHistory.problem,
            submitHistory.language,
            submitHistory.sourceCode
    )
}
