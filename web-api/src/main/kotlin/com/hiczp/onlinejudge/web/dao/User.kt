package com.hiczp.onlinejudge.web.dao

import org.springframework.data.repository.CrudRepository
import javax.persistence.*

@Entity
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,

        @Column(nullable = false, length = 16, unique = true)
        var username: String,

        @Column(nullable = false)
        var password: String,

        @Column(nullable = false, length = 16)
        var nick: String
)

interface UserRepository : CrudRepository<User, Long>
