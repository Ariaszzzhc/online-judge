package com.hiczp.onlinejudge.web.model

import com.hiczp.onlinejudge.shared.dao.Language
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull

data class SubmitFormModel(
        @field:NotNull
        val language: Language,

        @field:NotEmpty
        val sourceCode: String
)
