package com.hiczp.onlinejudge.runner.service

import com.hiczp.onlinejudge.shared.message.PendingSubmission

interface JudgeService {
    fun judgeAndSaveResult(pendingSubmission: PendingSubmission)
}
