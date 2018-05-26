package com.hiczp.onlinejudge.web.dao

import org.springframework.data.repository.CrudRepository
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

        @Column(nullable = false, length = 16)
        @Enumerated(EnumType.STRING)
        var judgeResult: JudgeResult = JudgeResult.WAITING,

        @Column(nullable = false)
        var time: Date = Date()
)

enum class JudgeResult {
    WAITING,
    COMPILE_ERROR,
    RUNTIME_ERROR,
    WRONG_ANSWER,
    ACCEPT
}

interface SubmitHistoryRepository : CrudRepository<SubmitHistory, Long>
