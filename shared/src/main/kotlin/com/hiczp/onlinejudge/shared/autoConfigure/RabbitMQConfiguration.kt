package com.hiczp.onlinejudge.shared.autoConfigure

import org.springframework.amqp.core.BindingBuilder
import org.springframework.amqp.core.Exchange
import org.springframework.amqp.core.Queue
import org.springframework.amqp.core.TopicExchange
import org.springframework.amqp.rabbit.connection.ConnectionFactory
import org.springframework.boot.autoconfigure.condition.ConditionalOnBean
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@ConditionalOnBean(ConnectionFactory::class)
@Configuration
open class RabbitMQConfiguration {
    @Bean
    open fun defaultQueue() = Queue(QUEUE_NAME)

    @Bean
    open fun defaultExchange() = TopicExchange(EXCHANGE_NAME)

    @Bean
    open fun binding(queue: Queue, exchange: Exchange) =
            BindingBuilder
                    .bind(queue)
                    .to(exchange)
                    .with(ROUTING_KEY)
                    .noargs()!!

    companion object {
        const val QUEUE_NAME = "DEFAULT_QUEUE"
        const val EXCHANGE_NAME = "DEFAULT_EXCHANGE"
        const val ROUTING_KEY = "DEFAULT_ROUTING_KEY"
    }
}
