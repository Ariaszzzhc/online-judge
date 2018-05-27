package com.hiczp.onlinejudge.shared.dao

import org.springframework.data.repository.CrudRepository
import java.io.Serializable
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
) : Serializable {
    enum class Type {
        PRACTICE,
        CONTEST
    }
}

interface ProblemSetRepository : CrudRepository<ProblemSet, Long> {
    fun findByType(type: ProblemSet.Type): List<ProblemSet>
}
