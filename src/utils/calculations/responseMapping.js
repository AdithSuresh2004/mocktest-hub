const createResponsesMap = (responses) => {
  const responsesMap = {}
  if (responses) {
    responses.forEach((r) => {
      responsesMap[r.q_id] = r.selected_opt_id
    })
  }
  return responsesMap
}

export { createResponsesMap }
