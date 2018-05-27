package com.hiczp.onlinejudge.shared.dao

import com.fasterxml.jackson.annotation.JsonIgnore
import org.springframework.data.repository.CrudRepository
import java.io.Serializable
import javax.persistence.*

@Entity
data class User(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long? = null,

        @Column(nullable = false, unique = true)
        var username: String,

        @JsonIgnore
        @Column(nullable = false)
        var password: String,

        @Column(nullable = false, length = 32)
        var nick: String
) : Serializable

interface UserRepository : CrudRepository<User, Long>
