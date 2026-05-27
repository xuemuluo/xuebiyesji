package com.sturegsys.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sturegsys.entity.Student;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface StudentMapper extends BaseMapper<Student> {
}
