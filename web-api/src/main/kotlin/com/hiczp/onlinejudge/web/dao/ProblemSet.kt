package com.hiczp.onlinejudge.web.dao

import org.springframework.data.repository.CrudRepository
import java.util.*
import javax.persistence.*

@Entity
data class ProblemSet(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,

        @Column(nullable = false, length = 64)
        var title: String,

        @Column(nullable = false, length = 16)
        @Enumerated(EnumType.STRING)
        var type: Type,

        @Column(nullable = false, length = 64)
        var contributor: String,

        @Column
        var expire: Date
) {
    enum class Type {
        PRACTICE,
        CONTEST
    }
}

interface ProblemSetRepository : CrudRepository<ProblemSet, Long>
