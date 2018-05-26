package com.hiczp.onlinejudge.web.dao

import org.springframework.data.repository.CrudRepository
import javax.persistence.*

@Entity
data class Problem(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,

        @ManyToOne(optional = false)
        var problemSet: ProblemSet,

        @Column(nullable = false)
        var indexInProblemSet: Long,

        @Column(nullable = false, length = 64)
        var title: String,

        @Column(nullable = false)
        var submitUser: Long = 0,

        @Column(nullable = false)
        var submitCount: Long = 0,

        @Column(nullable = false)
        var acceptCount: Long = 0
)

interface ProblemRepository : CrudRepository<Problem, Long> {
    fun findByProblemSet_IdOrderByIndexInProblemSet(id: Long): List<Problem>
}
