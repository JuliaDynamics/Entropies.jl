export SymbolicProbabilityEstimator

"""
A probability estimator based on symbolization.
"""
abstract type SymbolicProbabilityEstimator <: ProbabilitiesEstimator end

include("utils.jl")
include("symbolic_permutation.jl")




