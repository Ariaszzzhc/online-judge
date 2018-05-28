package com.hiczp.onlinejudge.runner.configuration

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.stereotype.Component

@Component
@ConfigurationProperties("runner")
class RunnerConfigurationProperties {
    var workDirectory: String = "."
}
