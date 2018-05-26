package com.hiczp.onlinejudge.shared.autoConfigure

import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@Configuration
@EntityScan(basePackages = ["com.hiczp.onlinejudge.shared.dao"])
@ComponentScan(basePackages = ["com.hiczp.onlinejudge.shared.dao"])
@EnableJpaRepositories(basePackages = ["com.hiczp.onlinejudge.shared.dao"])
open class ComponentScanAutoConfigure
