<?php

// Create app/Traits/Searchable.php
namespace App\Traits;

trait Searchable
{
    /**
     * Search across fields including relationships
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $searchTerm
     * @param array|null $config Override default search config
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $searchTerm, $config = null)
    {
        if (empty($searchTerm)) {
            return $query;
        }

        $config = $config ?? $this->getSearchableConfig();

        return $query->where(function ($q) use ($searchTerm, $config) {
            $hasConditions = false;

            // Search in direct model fields
            if (isset($config['fields']) && ! empty($config['fields'])) {
                foreach ($config['fields'] as $field) {
                    if (! $hasConditions) {
                        $q->where($field, 'like', "%{$searchTerm}%");
                        $hasConditions = true;
                    } else {
                        $q->orWhere($field, 'like', "%{$searchTerm}%");
                    }
                }
            }

            // Search in relationship fields
            if (isset($config['relationships']) && ! empty($config['relationships'])) {
                foreach ($config['relationships'] as $relation => $fields) {
                    $q->orWhereHas($relation, function ($relationQuery) use ($searchTerm, $fields) {
                        $relationQuery->where(function ($rq) use ($searchTerm, $fields) {
                            foreach ($fields as $index => $field) {
                                if ($index === 0) {
                                    $rq->where($field, 'like', "%{$searchTerm}%");
                                } else {
                                    $rq->orWhere($field, 'like', "%{$searchTerm}%");
                                }
                            }
                        });
                    });
                }
            }

            // Search in nested relationships (relation.nested_relation)
            if (isset($config['nested_relationships']) && ! empty($config['nested_relationships'])) {
                foreach ($config['nested_relationships'] as $relations => $fields) {
                    $relationParts = explode('.', $relations);

                    $q->orWhereHas($relationParts[0], function ($firstRelation) use ($relationParts, $fields, $searchTerm) {
                        if (count($relationParts) > 1) {
                            $nestedRelation = implode('.', array_slice($relationParts, 1));
                            $firstRelation->whereHas($nestedRelation, function ($nestedQuery) use ($fields, $searchTerm) {
                                $nestedQuery->where(function ($nq) use ($searchTerm, $fields) {
                                    foreach ($fields as $index => $field) {
                                        if ($index === 0) {
                                            $nq->where($field, 'like', "%{$searchTerm}%");
                                        } else {
                                            $nq->orWhere($field, 'like', "%{$searchTerm}%");
                                        }
                                    }
                                });
                            });
                        }
                    });
                }
            }
        });
    }

    /**
     * Get searchable configuration
     * Override this method in your model to define searchable fields
     *
     * @return array
     */
    protected function getSearchableConfig()
    {
        return [
            'fields'               => ['name'],
            'relationships'        => [],
            'nested_relationships' => [],
        ];
    }

    /**
     * Quick search method for simple field searches
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $searchTerm
     * @param array $fields
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeQuickSearch($query, $searchTerm, array $fields)
    {
        if (empty($searchTerm) || empty($fields)) {
            return $query;
        }

        return $query->where(function ($q) use ($searchTerm, $fields) {
            foreach ($fields as $index => $field) {
                if ($index === 0) {
                    $q->where($field, 'like', "%{$searchTerm}%");
                } else {
                    $q->orWhere($field, 'like', "%{$searchTerm}%");
                }
            }
        });
    }
}
