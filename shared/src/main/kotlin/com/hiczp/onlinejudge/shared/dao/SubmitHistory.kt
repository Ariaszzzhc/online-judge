package com.hiczp.onlinejudge.shared.dao

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.PagingAndSortingRepository
import java.util.*
import javax.persistence.*

@Entity
data class SubmitHistory(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,

        @ManyToOne(optional = false)
        var problem: Problem,

        @ManyToOne(optional = false)
        var user: User,

        @Column(nullable = false)
        @Enumerated(EnumType.STRING)
        var language: Language,

        @Column(nullable = false)
        @Lob
        var sourceCode: String,

        @Column(nullable = false, length = 16)
        @Enumerated(EnumType.STRING)
        var judgeResult: JudgeResult = JudgeResult.WAITING,

        @Column
        var runningTime: Long? = null,

        @Column(nullable = false)
        var submitTime: Date = Date()
)

enum class Language {
    C,
    CPP,
    JAVA
}

enum class JudgeResult {
    WAITING,
    COMPILE_ERROR,
    RUNTIME_ERROR,
    WRONG_ANSWER,
    ACCEPT
}

@Suppress("FunctionName")
interface SubmitHistoryRepository : PagingAndSortingRepository<SubmitHistory, Long> {
    fun countByProblem_Id(problemId: Long): Long

    fun countByProblem_IdAndJudgeResult(problemId: Long, judgeResult: JudgeResult): Long

    fun findByProblem_ProblemSet_IdOrderBySubmitTimeDesc(problemSetId: Long, pageable: Pageable): Page<SubmitHistory>
}
